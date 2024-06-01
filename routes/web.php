<?php

use App\Http\Controllers\ProfileController;
use App\Jobs\SendMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['redirect.rooms'])->group(function() {
    Route::get('/', function () {
        $users = User::query()->orderBy('name', 'asc')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_online' => $user->isOnline(),
            ];
        });

        return Inertia::render('home', [ 'users' => $users ]);
    })->name('home');
});

Route::post('/generate-fake-user', function () {
    User::factory(3)->create();
    return back();
})->name('generate.users');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/rooms', function () {
        $messages = Message::query()->with('user')->get();

        return Inertia::render('rooms', [
            'messages' => $messages,
        ]);
    })->name('rooms');

    Route::post('/messages', function (Request $request) {
        $request->validate([
            'message' => 'required|string'
        ]);

        /** @var User $user */
        $user = auth()->user();

        $message = $user->messages()->create([
            'content' => $request->message
        ]);

        Log::info('estou dispachando...');
        SendMessage::dispatch($message);
    })->name('messages');
});

require __DIR__.'/auth.php';

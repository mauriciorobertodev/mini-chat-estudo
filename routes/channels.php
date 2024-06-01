<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('channel-for-everyone', function ($user) {
    Log::debug('Usuário autorizado:', $user->toArray());
    return $user->toArray();
    // return true;
});

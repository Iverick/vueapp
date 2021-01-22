<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /*
     * POST :user/toggle_saved endpoint.
     * 
     * Adds or removes an index from the user's array of saved images indices based on
     * the user action.
     * 
     * @return json object.
     */
    public function toggle_saved() {
        $id = Input::get('id');
        $user = Auth::user();
        $saved = $user->saved;
        $key = array_search($id, $saved);
        
        if ($key === FALSE) {
            // If there is no an index with such key in the saved array, then push it into a store.
            array_push($saved, $id);
        }
        else {
            // Remove an index from saved array in case of index matching.
            array_splice($saved, $key, 1);
        }
        
        // Update the saved array associated with a user.
        $user->$saved = $saved;
        $user->save();
        
        return response()->json();
    }
    
    
}

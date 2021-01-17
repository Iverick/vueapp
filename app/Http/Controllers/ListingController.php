<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;


class ListingController extends Controller
{
    /*
     * Helper function.
     * 
     * Add 4 images from local resources to a corresponding model.
     * 
     * @return $model object.
     */
    private function add_image_urls($model, $id) {
        for ($i = 1; $i < 5; $i++) {
            $model['image_' . $i] = asset('images/' . $id . '/Image_' . $i . '.jpg');
        }
        
        return $model;
    }

    
    
    public function get_listing_api(Listing $listing) {
        $model = $listing->toArray();
        $model = $this->add_image_urls($model, $listing->id);
        
        return response()->json($model);
    }

    /*
     * Displays a home page of the application
     *
     * @return view object.
     */
    public function get_home_web() {
        return view ('app', ['model' => []]);
    }
    
    /*
     * Displays a listing view and provides $model object with it.
     * 
     * @return view object.
     */
    public function get_listing_web(Listing $listing) {
        $model = $listing->toArray();
        $model = $this->add_image_urls($model, $listing->id);
        return view('app', ['model' => $model]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;


class ListingController extends Controller
{
    /*
     * Helper function.
     *
     * Puts Listing model inside a collection.
     * Adds 4 images to the model array.
     * 
     * @return listing collection.
     */
    private function get_listing(Listing $listing) {
        $model = $listing->toArray();

        for ($i = 1; $i < 5; $i++) {
            $model['image_' . $i] = asset('images/' . $listing->id . '/Image_' . $i . '.jpg');
        }

        return collect(['listing' => $model]);
    }

    /*
     * Helper function.
     *
     * Adds the path to the colletion.
     * 
     * @return collection.
     */
    private function add_meta_data($collection, $request) {
        return $collection->merge(['path' => $request->getPathInfo() ]);
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
    public function get_home_web(Request $request) {
        $collection = Listing::all(['id', 'address', 'title', 'price_per_night']);
        // Add an thumbnail image to the collection of Listings
        $collection->transform(function ($listing) {
            $listing->thumb = asset('images/' . $listing->id . '/Image_1_thumb.jpg');
            return $listing;
        });

        $data = collect(['listings' => $collection->toArray()]);
        $data = $this->add_meta_data($data, $request);
        return view ('app', ['data' => $data] );
    }
    
    /*
     * Displays a listing view and provides $model object with it.
     * 
     * @return view object.
     */
    public function get_listing_web(Listing $listing, Request $request) {
        $data = $this->get_listing($listing);
        $data = $this->add_meta_data($data, $request);
        return view('app', ['data' => $data]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
     * Adds the path and auth authentication status to the colletion.
     * 
     * @return collection.
     */
    private function add_meta_data($collection, $request) {
        return $collection->merge([
            'path' => $request->getPathInfo(),
            'auth' => Auth::check()
        ]);
    }

    /*
     * Helper function.
     *
     * Extracts all object from the Listing model.
     * 
     * @return collection of Listing instances.
     */
    private function get_listing_summaries() {
        $collection = Listing::all(['id', 'address', 'title', 'price_per_night']);
        // Add an thumbnail image to the collection of Listings
        $collection->transform(function ($listing) {
            $listing->thumb = asset('images/' . $listing->id . '/Image_1_thumb.jpg');
            return $listing;
        });

        return collect(['listings' => $collection->toArray()]);
    }

    /*
     * Displays a home page of the application
     *
     * @return view object.
     */
    public function get_home_web(Request $request) {
        $data = $this->get_listing_summaries();
        $data = $this->add_meta_data($data, $request);
        return view ('app', ['data' => $data] );
    }

    /*
     * Serves AJAX request when the home page route of the API application called
     *
     * @return JSON object.
     */
    public function get_home_api() {
        $data = $this->get_listing_summaries();
        return response()->json($data);
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

    public function get_listing_api(Listing $listing) {
        $data = $this->get_listing($listing);
        return response()->json($data);
    }
}

class TripsController < ApplicationController

  def home
    @places = Place.new
    @all_places = @places.read
    @place_names = @places.place_details
  end


end

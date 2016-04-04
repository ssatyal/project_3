
class TripsController < ApplicationController

  def home
    @places = Place.new
    @place = @places.read
    @place_name = @places.place_details

  end


end

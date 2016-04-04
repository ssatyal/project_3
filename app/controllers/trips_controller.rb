class TripsController < ApplicationController

  def home
    @places = Place.new
    @place = @places.read

  end

end

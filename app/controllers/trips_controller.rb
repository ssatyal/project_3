class TripsController < ApplicationController

  def home
    @places = Place.new
    @places = @places.read
  end


end

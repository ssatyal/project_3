class LocationsController < ApplicationController

  def search
    render json: Place.read(params[:q])
  end

end

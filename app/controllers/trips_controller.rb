class TripsController < ApplicationController

  before_action do
    if params[:id]
      @trip = Trip.find(params[:id])
    end
  end
  def index
    @trips = Trip.all
    respond_to do |format|
    format.html
    format.json{ render json: @trips, status: :ok}
    end
  end
  def show
    render json: @trip, status: :ok
  end

  def home
    # @all_places = Place.read
    # @place_names = Place.place_details
  end

  def create
    @trip = Trip.create trip_params
    render json: @trip
  end

  private
  def trip_params
    params.permit(:name, :category)
  end

end

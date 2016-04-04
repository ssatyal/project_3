class TripsController < ApplicationController

  def home
    response =
  HTTParty.get("http://rubygems.org/api/v1/versions/httparty.json")
    # @client = GooglePlaces::Client.new(AIzaSyDRtvnExjmDi4aj1v7eUJuOP2dH74x1Xww)
    # @client.spots(-33.8670522,151.1957362)
    # @places = Places.all
    # respond_to do |format|
    #   format.html
    #   format.json {render json: @places, status: :ok}
    end


  end

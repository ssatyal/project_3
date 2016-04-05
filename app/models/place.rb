class Place

  def read
      # google API which returns places within the specified radius of the given location coordinates
    url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=500&type=museum&key=#{ENV["google_api_key"]}"

    # HTTParty calls the google API and we are storing the API response in a varialbe called response
    response = HTTParty.get(url, :verify => false)

    # the bulk of the data we need is in the "results" object of the response, which we are isolating here
    responses = response["results"]

    # we are looping through the responses, parsing out the place_id, and storing all of the id's in an instance variable
    @place_ids = []
    responses.map do |place|
      @place_ids << place["place_id"]
    end
  end

  def place_details
    # we are looping through all of the place_ids and then calling the Google API in order to retrieve the Place's name, which we are storing in the @place_name instance varialbe array
    @place_name = []
    @place_ids.each do |id|
      url  = "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{id}&key=#{ENV["google_api_key"]}"
      response = HTTParty.get(url, :verify => false)
     @place_name << response["result"]["name"]
    end
    @place_name
  end

end

class Place

  def read
    url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=500&type=museum&key=AIzaSyCJj9kSrensH6kVLTBPWflEYb-OoC1VLc4"

    response = HTTParty.get(url)

    responses = response["results"]

    place_ids = []

    responses.map do |place|
      place_ids << place["place_id"]
    end
  end

  def place_details
    url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJmV8qlcAEdkgRzTiP9B71Ebs&key=AIzaSyCJj9kSrensH6kVLTBPWflEYb-OoC1VLc4"

    response = HTTParty.get(url)
    response["result"]["name"]
  end


end

class Place

  def read
    url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=5000&type=museum&key=AIzaSyDRtvnExjmDi4aj1v7eUJuOP2dH74x1Xww"

    response = HTTParty.get(url)

    response = JSON.parse(response.body)["results"]

    # return cat = [response[1]['place_id'],
    # response[2]['place_id'], response[3]['place_id']]

    # google_places = []
    # response.each do |i|
    #   google_places << response[i]['place_id']
    #   return google_places
    # end
  end


  def place_details
    url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJmV8qlcAEdkgRzTiP9B71Ebs&key=AIzaSyDRtvnExjmDi4aj1v7eUJuOP2dH74x1Xww"

    response = HTTParty.get(url)
    response["result"]["name"]
  end


end

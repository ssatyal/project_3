class Place

  def read
    url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=5000&type=museum&key=AIzaSyDRtvnExjmDi4aj1v7eUJuOP2dH74x1Xww"

    response = HTTParty.get(url)
  end

end

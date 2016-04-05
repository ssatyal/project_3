class SearchController < ApplicationController

  def search_params
    params.require(:search).permit(:entry)
  end

end

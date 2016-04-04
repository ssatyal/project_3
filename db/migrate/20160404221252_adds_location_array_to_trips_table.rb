class AddsLocationArrayToTripsTable < ActiveRecord::Migration
  def change
    add_column :trips, :locations, :string, array: true, default: []
  end
end

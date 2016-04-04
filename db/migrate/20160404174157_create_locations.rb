class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.float :lat
      t.float :long
      t.string :place_id
      t.references :trip, index: true, foreign_key: true
    end
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Location.destroy_all
Trip.destroy_all

trip1 = Trip.create!(name:"Project 3", category:"Review")
trip1.locations.create!(name:"General Assembly Washington DC", lat:38.904877,long:-77.036217)

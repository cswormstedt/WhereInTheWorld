require 'sinatra/base'

require './controllers/ApplicationController'
require './controllers/HomeController'
require './controllers/PlaceController'

require './models/UserModel'
require './models/PlaceModel'

map('/') {run ApplicationController}
map('/home') {run HomeController}
mao('/place') {run PlaceController}
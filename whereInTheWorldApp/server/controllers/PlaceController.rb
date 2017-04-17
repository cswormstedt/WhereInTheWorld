class PlaceController < ApplicationController

  options "*" do
    response.headers["Allow"] = "HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS"

    # Needed for AngularJS
    response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
    response['Access-Control-Allow-Origin'] = '*'

    "cool"
  end


  get '/' do
    response['Access-Control-Allow-Origin'] = '*'
    content_type :json

    @places = Place.all
    @places.to_json
  end

  get '/:user_id' do
    user_id = params[:user_id]
    @user = User.find(user_id)
    @places = @user.places

    @place.to_json
  end

  post '/' do
    response['Access-Control-Allow-Origin'] = '*'
      content_type :json

      # data = JSON.parse(request.body.read)
      # p '--------------------'
      # puts data 
    
    @place = Place.new
    @place.latitude = params["latitude"]
    @place.longitude = params["longitude"]
    @place.user_id = session[:user_id]

    @place.save
    @place.to_json
  end

  patch '/:id' do

  end

  delete '/:id' do

    place = Place.find_by(user_id)
    place.destroy

  end

end
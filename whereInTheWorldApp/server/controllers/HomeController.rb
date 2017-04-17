class HomeController < ApplicationController

	get '/' do
		
		"user start"
	end

	post '/' do

		username = params[:username]
		password = params[:password]

		user = User.find_by(username: username)
		if user && user.authenticate(password)
			session[:logged_in] = true
			session[:username] = user
			session[:user_id] = user.id

			"places"

		else
			@message = 'username or password was incorrect'
			
		end
	end

	get '/register' do 
		'register'
	end

	post '/register' do
		user = User.new

		user.username   = params["username"]
		user.password   = params["password"]
		
		user.save

		"succes"
	end


	delete '/:user_id' do
	    user = User.find_by(user_id)
	    user.destroy
	end


end
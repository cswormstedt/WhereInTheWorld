class ApplicationController < Sinatra::Base
	enable :sessions

	require 'bundler'
	Bundler.require

	 ActiveRecord::Base.establish_connection(
    :adapter => 'postgresql',
    :database => 'whereapp'
  )

	set :session_secret, 'dont trust anyone who doesnt have wu-tang on their ipod'

	not_found do
		"not_found"
	end	

	get '/logout' do
		session.destroy

		redirect '/home'
	end



end
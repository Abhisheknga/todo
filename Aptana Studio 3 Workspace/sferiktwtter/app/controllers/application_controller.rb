class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  require 'twitter'
  @client = Twitter::Streaming::Client.new do |config|
      config.consumer_key        = "Ds0Ihyl1bhfUbQJr5eRTw"
      config.consumer_secret     = "TAwji5dP3kpE1ZdQfC5FueYOcpUaPbax1jbvmqIX0"
      config.access_token        = "378449228-KoBIhIx18L0MrJiqXK5HZ99pWIlTqJqJYgmNNdon"
      config.access_token_secret = "JkX21DV8sWT6F2XiqRp1Wrk2kITaZhtJdoZXUUueHA8mQ"
    end
end

Sferiktwtter::Application.routes.draw do
  get "home/index"
  root 'home#index'
  
  match '/method1', :action =>'method1', :controller =>'home', via: [:get, :post]
end

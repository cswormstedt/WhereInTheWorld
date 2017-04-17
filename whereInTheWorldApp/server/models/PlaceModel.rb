class Place < ActiveRecord::Base
  self.table_name = "places"
  belongs_to :user
end
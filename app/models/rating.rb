class Rating < ActiveRecord::Base
  validates :entry_val, :entry_id, presence: true
  validates :entry_val, inclusion: { in: 0.5..5.0 }
  belongs_to :entry
  belongs_to :user
end

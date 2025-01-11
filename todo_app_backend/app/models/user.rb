class User < ApplicationRecord
  validates :name, presence: true
  validates :xp, numericality: { greater_than_or_equal_to: 0 }
  validates :level, numericality: { greater_than: 0 }
end

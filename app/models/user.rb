require 'bcrypt'
class User < ActiveRecord::Base
  attr_reader :password
  validates :user_name, :email, :password_digest, :session_token, presence: true
  validates :password, length: { in: 6..15, allow_nil: true }
  validates :user_name, uniqueness: true
  after_initialize :ensure_session_token
  has_many :user_feeds
  has_many :feeds, through: :user_feeds
  has_many :entries, through: :feeds

  def self.find_by_credentials(user_params)
   user = User.find_by(user_name: user_params[:user_name])
   return nil unless user
   user.is_password?(user_params[:password]) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(32)
  end

 def reset_session_token!
   self.session_token = self.class.generate_session_token
   self.save!
   self.session_token
 end

 def is_password?(pass)
   BCrypt::Password.new(self.password_digest).is_password?(pass)
 end

 def password=(password)
   @password = password
   self.password_digest = BCrypt::Password.create(password)
 end

 private

 def ensure_session_token
   self.session_token ||= self.class.generate_session_token
 end
end

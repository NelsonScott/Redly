require 'byebug'

desc "Update Entries for Each Feed in the Database"

task :update_feeds => :environment do
  puts "Updating feed..."
  feeds = Feed.all
  byebug
  feeds.each do |feed|
    feed.reload
  end
  puts "done."
end

desc "Update Entries for Each Feed in the Database"

task :update_feed => :environment do
  puts "Updating feed..."
  feeds = Feed.all
  feeds.each do |feed|
    puts feed.entries.pluck(:title)
  end
  puts "done."
end

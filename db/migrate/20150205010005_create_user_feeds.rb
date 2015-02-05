class CreateUserFeeds < ActiveRecord::Migration
  def change
    create_table :user_feeds do |t|
      t.integer :user_id, null: false
      t.integer :feed_id, null: false

      t.timestamps
    end

    remove_column :feeds, :user_id
  end
end

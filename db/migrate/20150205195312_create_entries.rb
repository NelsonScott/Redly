class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string   "guid",         null: false
      t.string   "title",        null: false
      t.string   "link",         null: false
      t.integer  "feed_id",      null: false
      t.datetime "published_at", null: false
      t.text     "json",         null: false
      t.datetime "created_at"
      t.datetime "updated_at"

      t.timestamps
    end
  end
end

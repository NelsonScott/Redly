# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150212193922) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "entries", force: true do |t|
    t.string   "guid",         null: false
    t.string   "title",        null: false
    t.string   "link",         null: false
    t.integer  "feed_id",      null: false
    t.datetime "published_at", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
    t.text     "content"
    t.string   "image_thumbs"
  end

  create_table "feeds", force: true do |t|
    t.string   "title",       null: false
    t.string   "url",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
    t.text     "description"
  end

  add_index "feeds", ["title"], name: "index_feeds_on_title", using: :btree

  create_table "ratings", force: true do |t|
    t.float    "entry_val",  null: false
    t.integer  "entry_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "user_feeds", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "feed_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "user_name",       null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["user_name"], name: "index_users_on_user_name", unique: true, using: :btree

end

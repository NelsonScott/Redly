class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.float :entry_val, null: false
      t.integer :entry_id, null: false

      t.timestamps
    end
  end
end

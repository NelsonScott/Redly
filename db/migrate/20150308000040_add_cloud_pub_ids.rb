class AddCloudPubIds < ActiveRecord::Migration
  def change
    add_column(:entries, :cloud_img_id, :string)
    add_column(:entries, :cloud_thumb_id, :string)
  end
end

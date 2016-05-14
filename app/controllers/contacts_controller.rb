class ContactsController < ActionController::Base

 respond_to :json

 def index

 respond_with Contact.all

  end

  def create

    respond_with Contact.create(contact_params)

  end

  def show 

    respond_with Contact.find(params[:id])
  end

   def edit 

    respond_with Contact.find(params[:id])
  end

 def update 

  contact =  Contact.find(params[:id])
  respond_with contact.update(contact_params)

  end

  def destroy
    respond_with Contact.find(params[:id]).destroy

  end

  private

  def contact_params

  params.require(:contact).permit(:name, :phone, :email)
  end

  end
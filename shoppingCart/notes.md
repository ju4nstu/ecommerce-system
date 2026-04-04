# CRUD RULES OF MY APPLICATION
## 1. Insert
*1.1 - User cannot create a cart if he already has one.
*1.2 - User cannot add a product if it's already in the cart.

## 2. Read
*2.1 - Search by user_id, using requisition parameters.

## 3. Update
*3.1 - User can update any item in his cart to whatever value he wants.
*3.1.1 - Should be "Increment by one". How can i guarantee this? Front end? Models?

## 4. Delete
*4.1 - Where should the delete options go? Requisition params? Requisition queries? I'm currently using req params (/:product_id/:user_id)  

NEED TO ADD SOME KIND OF AUTHORIZATION FOR THE REQ PARAMS ROUTES
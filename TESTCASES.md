MTQA-5140: [Multiple Tests]Login - Valid User   

MTQA-5141: [Multiple Tests] Cart - Add Item to Cart

MTQA-5142: [Multiple Tests] Cart - View Item in Cart 

MTQA-5143: [Multiple Tests] Menu - Logout User

# SauceDemo Test Cases

## Test Case 1: Valid Login

**Summary:** Login with valid credentials

**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter username: standard_user
3. Enter password: secret_sauce
4. Click login

**Expected Result:**
User is redirected to the inventory page


---

## Test Case 2: Invalid Login

**Summary:** Login with incorrect password

**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter username: standard_user
3. Enter password: wrong_password
4. Click login

**Expected Result:**
Error message is displayed


---

## Test Case 3: Locked Out User

**Summary:** Login with locked_out_user

**Steps:**
1. Navigate to https://www.saucedemo.com/
2. Enter username: locked_out_user
3. Enter password: secret_sauce
4. Click login

**Expected Result:**
Error message is displayed



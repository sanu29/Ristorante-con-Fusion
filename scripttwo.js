let payucall = (options) =>{
    const redirectUrl = location.href;
    console.log(redirectUrl)
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "https://secure.payu.in/_payment");
    var key = document.createElement("input");
    key.setAttribute("type", "hidden");
    key.setAttribute("name", "key");
    key.setAttribute("value", options?.key);
    form.appendChild(key)
    var txnid = document.createElement("input");
    txnid.setAttribute("type", "hidden");
    txnid.setAttribute("name", "txnid");
    txnid.setAttribute("value", options.txnid);
    form.appendChild(txnid)
    var productinfo = document.createElement("input");
    productinfo.setAttribute("type", "hidden");
    productinfo.setAttribute("name", "productinfo");
    productinfo.setAttribute("value", options.productinfo);
    form.appendChild(productinfo)

    var amount = document.createElement("input");
    amount.setAttribute("type", "hidden");
    amount.setAttribute("name", "amount");
    amount.setAttribute("value", Number(options.amount));
    form.appendChild(amount)

    var email = document.createElement("input");
    email.setAttribute("type", "hidden");
    email.setAttribute("name", "email");
    email.setAttribute("value",options.email);
    form.appendChild(email)
    var firstname = document.createElement("input");
    firstname.setAttribute("type", "hidden");
    firstname.setAttribute("name", "firstname");
    firstname.setAttribute("value", options.firstname);
    form.appendChild(firstname)

    var lastname = document.createElement("input");
    lastname.setAttribute("type", "hidden");
    lastname.setAttribute("name", "lastname");
    lastname.setAttribute("value", options.lastname);
    form.appendChild(lastname)
    var userkey = document.createElement("input");
    userkey.setAttribute("type", "hidden");
    userkey.setAttribute("name", "userkey");
    userkey.setAttribute("value", options.userkey);
    form.appendChild(userkey)
    var furl = document.createElement("input");
    furl.setAttribute("type", "hidden");
    furl.setAttribute("name", "furl");
    furl.setAttribute("value", `http://139.144.6.235/api/payment/payu/status?redirectUrl=${encodeURIComponent(redirectUrl)}`);
    form.appendChild(furl)

    var surl = document.createElement("input");
    surl.setAttribute("type", "hidden");
    surl.setAttribute("name", "surl");
    surl.setAttribute("value", `http://139.144.6.235/api/payment/payu/status?redirectUrl=${encodeURIComponent(redirectUrl)}`);
    form.appendChild(surl)

    var phone = document.createElement("input");
    phone.setAttribute("type", "hidden");
    phone.setAttribute("name", "phone");
    phone.setAttribute("value", options.phone);
    form.appendChild(phone)

    var hash = document.createElement("input");
    hash.setAttribute("type", "hidden");
    hash.setAttribute("name", "hash");
    hash.setAttribute("value", options.hash);
    form.appendChild(hash)

    var hash = document.createElement("input");
    hash.setAttribute("type", "hidden");
    hash.setAttribute("name", "hash");
    hash.setAttribute("value", options.hash);
    form.appendChild(hash)

    var hash = document.createElement("input");
    hash.setAttribute("type", "hidden");
    hash.setAttribute("name", "hash");
    hash.setAttribute("value", options.hash);
    form.appendChild(hash)

    var drop_category = document.createElement("input");
    drop_category.setAttribute("type", "hidden");
    drop_category.setAttribute("name", "drop_category");
    drop_category.setAttribute("value", options.drop_category);
    form.appendChild(drop_category)

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "submit");
    submit.setAttribute("value", 'submit');
    form.appendChild(submit)

    document.getElementsByTagName("body")[0]
    .appendChild(form);
    console.log(options)
    console.log((options.amount))
    submit.click()
}

window.payucall = payucall

const handlePay = async(key,password,firstname="",lastname="",email="",amount,phone) =>{
    const res = await axios.post("http://139.144.6.235/api/payment/payment",{key:key,password:password,
    firstname:firstname,
    lastname:lastname,
    email:email,
    amount:amount,
     phone:phone
    })
    if(res.data.data.pg===1)
    {
      let options = {...res.data.data,
        handler: async (response) => {
          console.log(response)
          try {
            response = {...response,key:key,password:password, pg:1,keyNum:options.keyNum}
            const verifyUrl = "http://139.144.6.235/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            let newRes = {status:data.status}
            let urlOfRedirection = location.href+"?data="+JSON.stringify(newRes)
            window.location.href = urlOfRedirection
          } catch (error) {
            console.log(error);
          }
        }
      }
  
      const paymentObject = new window.Razorpay(options);
      console.log(paymentObject)
      paymentObject.on('payment.failed', async function (response){
        try {
          const verifyUrl = "http://139.144.6.235/api/payment/verify";
          response = {...response,key:key,password:password,pg:1,keyNum:options.keyNum}
          const { data } = await axios.post(verifyUrl, response);
          let newRes = {status:data.status}
          let urlOfRedirection = location.href+"?data="+JSON.stringify(newRes)
          window.location.href = urlOfRedirection
        } catch (error) {
          console.log(error);
        }
        
        paymentObject.close()
    });
      paymentObject.open()
    }
    else{
      let options = res.data.data
    window.payucall(options)
    }
  }

  window.handlePay = handlePay


 

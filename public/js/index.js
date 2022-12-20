const btn = document.querySelector('.close');
        const btn1 = document.querySelector('.close1');
        const btn2 = document.querySelector('.close2');
        const btn3 = document.querySelector('.close3');
        const editname = document.querySelector('.editname');
        const editemail = document.querySelector('.editemail');
        const editphone = document.querySelector('.editphone');
        const settingBtn = document.querySelector('.setting');
        const editContainer = document.querySelector('.usr-edit');
        btn.addEventListener('click',()=>{
            editContainer.style.visibility = 'hidden';
        })
        settingBtn.addEventListener('click',()=>{
            editContainer.style.visibility = 'visible';
        });
        const editContainer1 = document.querySelector('.usr-edit1');
        const editContainer2 = document.querySelector('.usr-edit2');
        const editContainer3 = document.querySelector('.usr-edit3');
        editname.addEventListener('click',()=>{
            editContainer1.style.visibility = 'visible';
        })
        btn1.addEventListener('click',()=>{
            editContainer1.style.visibility = 'hidden';
        })
        editemail.addEventListener('click',()=>{
            editContainer2.style.visibility = 'visible';
        })
        btn2.addEventListener('click',()=>{
            editContainer2.style.visibility = 'hidden';
        })
        editphone.addEventListener('click',()=>{
            editContainer3.style.visibility = 'visible';
        })
        btn3.addEventListener('click',()=>{
            editContainer3.style.visibility = 'hidden';
        })

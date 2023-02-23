import { useState } from 'react'
import './AddPost.css'
import { useGlobalContext } from '../hook/Context'
import { useHistory } from 'react-router-dom';

const AddPost = () => {
    const {blogType} = useGlobalContext();
    const history = useHistory();

    // ################## state
    const [imgUrl, setImgUrl] = useState('');
    // ################## func
    const handleFile = (ev)=>{
        const img = ev.target.files[0];
        const url = URL.createObjectURL(img);
        setImgUrl(url);
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 2000);
    }
    const sendPost = (fd)=>{
        fetch('http://192.168.173.1:3001/api/v1/blog',{method:"POST",body:fd,mode:'cors',credentials:'include'})
        .then(item=>item.json())
        .then(item=>{
            if(item.status === 'fail') throw new Error(item.message);
            console.log('Item :',item);
            history.goBack();
            // fetchBlog(page,blogType);
            // location.reload();
        })
        .catch(err=>{
            console.log('Error creating blog: ',err);
        })
    }
    const handleSubmit = (ev)=>{
        ev.preventDefault();
        const ele = ev.target;
        const mainTitle = ele["mainTitle"].value;
        const subTitle = ele["subTitle"].value;
        const imgText = ele["imgText"].value;
        const imgFile = ele["imgFile"].files[0];
        const blogText = ele["blogText"].value;
        const fd = new FormData();
        fd.append('title',mainTitle)
        fd.append('date',Date.now());
        fd.append('img',`/public/blog_img/${window.decodeURIComponent(imgFile.name).replace(/(\s|-|&)/gim, '_')}`)
        fd.append('imgWithText',JSON.stringify([{
            smallTitle:subTitle,
            text:blogText,
            img:[{
                src:`/public/blog_img/${window.decodeURIComponent(imgFile.name).replace(/(\s|-|&)/gim, '_')}`,
                imgTitle:imgText
            }]
        }]))
        // fd.append('owner',user._id)
        fd.append('type',blogType || 'business')
        fd.append('imgFile',imgFile)
        sendPost(fd);
        // console.log({mainTitle,subTitle,imgText,imgFile,blogText});
    }
    // ################## effect
    
    return (
        <div className='addPost'>
            <div className="card mt-5">
                <div className="card-body">
                    <h1 className="card-title text-center">Add Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="from-group mt-3">
                            <input type="text" name='mainTitle' placeholder='Main Title' className="form-control"/>
                        </div>
                        <div className="from-group mt-3">
                            <input type="text" name='subTitle' placeholder='Subtitle' className="form-control"/>
                        </div>
                        <div className="from-group mt-3">
                            <div className="card">
                                <img src={imgUrl} alt="" className="card-img-top"/>
                            </div>
                        </div>
                        <div className="from-group mt-3">
                            <input type="text" name='imgText' placeholder='Text under Image' className="form-control"/>
                        </div>
                        <div className="from-group mt-3">
                            <input type="file" name='imgFile' onChange={handleFile} placeholder='Main Title' className=""/>
                        </div>
                        <div className="from-group mt-3">
                            <input type="text" name='blogText' placeholder='Paragraph' className="form-control"/>
                        </div>
                        <div className="from-group mt-3">
                            <button className="btn btn-primary btn-block">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost

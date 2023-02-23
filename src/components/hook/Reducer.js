export const reducer = (state,action)=>{
    console.log(action.type);
    switch (action.type) {
        
        default:
            throw new Error('No state match in reducer');
    }
}
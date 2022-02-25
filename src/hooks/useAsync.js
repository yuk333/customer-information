import {useReducer,useEffect} from "react";
function reducer(state,action){
    switch(action.type){
        case 'LOADING': 
        return{
            loading:true,
            data:null,
            error:null
        };
        case 'SUCCESS':
        return{
            loading:false,
            data:action.data,
            error:null
        };
        case 'ERROR' :
        return{
            loading:false,
            data:null,
            errir:action.error
        };
        default:
            return state;
    }
}

function useAsync(callback,deps=[]){
    const [state,dispatch] = useReducer(reducer, {
        loading:false,
        data:null,
        error:null
    })
    const fetchData = async () =>{
        try{
            dispatch({type:'LOADING'})
            const data = await callback()
            dispatch({type:'SUCCESS', data:data});
        }
        catch(e){
            dispatch({type:'ERROR',error:e})
        }
    }
    useEffect(()=>{
        fetchData();
    },deps)
    return state;
}
export default useAsync;
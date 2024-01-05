import { 
    START_LOADING, 
    END_LOADING, 
    FETCH_ALL, 
    FETCH_POST, 
    FETCH_BY_SEARCH, 
    CREATE, 
    UPDATE, 
    LIKE, 
    COMMENT, 
    DELETE 
} from '../constants/actionTypes';
import * as api from '../api';


export const getPosts = () => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        
        const { data  } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
    
        const { data } = await api.fetchPost(id);
    
        dispatch({ type: FETCH_POST, payload: { post: data } });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPostsBySearch(searchQuery);
        
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


export function createPost(post, navigate) {
    return (
        async (dispatch) => {

            try {
                dispatch({ type: START_LOADING });
            
                const { data } = await api.createPost(post);
            
                dispatch({ type: CREATE, payload: data });
                
                navigate(`/posts/${data._id}`);      
                
                dispatch({ type: END_LOADING });
            } catch (error) {
                console.log(error);
            }
        }
    )
};


export function updatePost(id, post, navigate) {
    return (
        async (dispatch) => {

            try {
                dispatch({ type: START_LOADING });
            
                const { data } = await api.updatePost(id, post);
            
                dispatch({ type: UPDATE, payload: data });
                
                navigate(`/posts/${data._id}`);
                
                dispatch({ type: END_LOADING });
            } catch (error) {
                console.log(error);
            }
        }
    )
};


export const likePost = (id) => async (dispatch) => {  
    try {
        const { data } = await api.likePost(id);
    
        dispatch({ type: LIKE, payload: data });
  
    } catch (error) {
        console.log(error);
    }
};


export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(value, id);
    
        dispatch({ type: COMMENT, payload: data });
    
        return data.comments;
  
    } catch (error) {
        console.log(error);
    }
};
  

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id })

    } catch (error) {
        console.log(error);
    }
};
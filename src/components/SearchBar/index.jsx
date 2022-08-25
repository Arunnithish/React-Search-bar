import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IoSearch , IoClose} from 'react-icons/io5';
import styled from 'styled-components';
import { useClickOutside } from 'react-click-outside-hook';
import { MoonLoader } from 'react-spinners/MoonLoader';

const SearchBarContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 34em;
    height: 4em;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 12px 3px rgba(0,0,0,0.14);
    overflow: hidden;
    margin: 0 auto;
`

const SearchInputContainer = styled.div`
    width: 100%;
    min-height: 4em;
    display: flex;
    align-items: center;
    pad: 2px 25px;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 21px;
    color: #12112e;
    font-weight: 500;
    border-radius: 4px;
    background-color: transparent;


    &:focus{
        outline: none;
        &::placeholder{
            opacity: 0;
        }
    }

    &::placeholder{
        color: grey;
        transition: all 250ms ease-in-out;
    }
`;


const SearchIcon = styled.span`
    color: #bebebe;
    font-size: 27px;
    margin-left: 10px;
    margin-top:6px;
    vertical-align: middle;
`

const CloseIcon = styled.span`
    color: #bebebe;
    font-size: 20px;
    margin-right: 10px;
    margin-top:6px;
    vertical-align: middle;
    cursor: pointer;
    transition: all 200ms ease-in-out;

    &:hover{
        color: #dfdfdf;
    }
`;

const Lineseperator = styled.div`
   width: 100%;
    display: flex;
    flex-direction: column;
    opacity: 0.2;
    border: solid 1px grey;
`
const SearchResults = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1em;
`;

const LoadingSpinner = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const containerVariants = {
    expanded:{

        height:"25em",

    },
    collapsed:{

        height:"3.5em",

    }
}
const SearchBar = (props) => {

    const[isExpanded , setExpanded] = useState(false);
    const[ref,isClicked] = useClickOutside();
    const inputRef = useRef();

    const expandConatiner =()=>{
        setExpanded(true);
    }
    const collapseConatiner =()=>{
        setExpanded(false);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }


    useEffect(()=>{
        if(isClicked){
            collapseConatiner();
        }
    },[isClicked])

  return (
    <SearchBarContainer 
    animate={isExpanded ? 'expanded':'collapsed'} 
    variants={containerVariants}
    ref={ref}
    >
        <SearchInputContainer>
            <SearchIcon>
                <IoSearch/>
            </SearchIcon>
            <SearchInput 
            ref={inputRef}
            placeholder='Search for series/movies'
             onFocus={expandConatiner} ></SearchInput>

             {isExpanded && (
                     <CloseIcon onClick={collapseConatiner}>
                     <IoClose />
                 </CloseIcon>
             )}
           
        </SearchInputContainer>
        <Lineseperator></Lineseperator>
        <SearchResults>
            <LoadingSpinner>
                {/* <MoonLoader  loading color='#000' size={20} /> */}
                Loading.....
            </LoadingSpinner>
            
        </SearchResults>
    </SearchBarContainer>
  )
}

export default SearchBar;
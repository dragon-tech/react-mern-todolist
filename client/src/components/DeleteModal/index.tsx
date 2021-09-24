import React from "react";
import classnames from "classnames";
import CloseIcon from "assets/svg/close";
import { Transition } from "react-transition-group";

type Props = {
    inProp : boolean,
    taskStatus: 'completed' | 'uncompleted',
    onDelete: () => void,
    onCancel: () => void
}

const DURATION = 300;

const defaultStyle = {
    transition: `all ${DURATION}ms ease-in-out`,
    opacity: 0,
    display: 'none',
    left: '50%',
    top: '50%'
}

const transitionStyles = {
    unmounted: {opacity: 0, display:'none'},
    entering: {opacity: 1, display:'block'},
    entered: {opacity: 1, display:'block'},
    exiting: {opacity: 0, display:'none'},
    exited: {opacity: 0, display:'none'}
}

const overlayDefaultStyle = {
    transition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION + 2}ms ease-in-out`,
    opacity: 0,
    display: 'none' 
}

const overlayTransitionStyle = {
    unmounted: {bottom: '-180px', opacity:0},
    entering: {display:'block', opacity: .5},
    entered: {display:'block', opacity: .5},
    exiting: {bottom: '-180px', opacity:0},
    exited: {bottom: '-180px', opacity:0}
}

const DeleteModal: React.FC<Props> = ({inProp, taskStatus, onDelete, onCancel}) => {
    const buttonStyle = classnames(`text-white text-sm tracking-wide font-bold px-4 py-2 rounded-lg`,{
        'bg-red-600': taskStatus === 'uncompleted',
        'bg-green-600': taskStatus === 'completed'
    })
    return (
        <Transition in={inProp} timeout={DURATION}>
            {(state) => (
                <>
                    <div 
                        onClick={onCancel}
                        style={{
                            ...overlayDefaultStyle,
                            ...overlayTransitionStyle[state]
                        }}
                        className="fixed z-10 left-0 top-0 bottom-0 right-0 mx-auto max-w-lg bg-black"
                    />
                        
                    <div 
                        className="bg-white p-4 h-40 w-64 rounded-lg fixed z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                    >
                        <div className="flex flex-col h-full justify-between">
                            <section className="flex flex-row justify-between"> 
                                <p className="text-darkPurple text-sm subpixel-antialiased tracking-wide font-bold whitspace-normal">
                                    {taskStatus === 'uncompleted' && 'This task is not completed, delete?'}
                                    {taskStatus === 'completed' && 'Congrats on completing the task!'}

                                    {taskStatus === 'completed' && (
                                        <span className="text-2xl">
                                            &#128540;
                                        </span>
                                    )}
                                    {taskStatus === 'uncompleted' && (
                                        <span className="text-2xl">
                                            &#128548;
                                        </span>
                                    )}
                                </p>

                                <CloseIcon onClick={onCancel} />
                            </section>
                            <button 
                                onClick={onDelete}
                                className={buttonStyle}
                            >
                                {taskStatus === 'completed' ? 'Delete completed task' : 'Delete uncompleted task'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </Transition>
    )
}

export default DeleteModal;
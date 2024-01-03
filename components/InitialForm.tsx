import React from 'react';

const InitialForm = ({ onFormSubmit }: any) => {
    const [option1, setOption1] = React.useState<undefined | string>('');
    const [option2, setOption2] = React.useState<undefined | string>('');
    const [option3, setOption3] = React.useState<undefined | string>('');


    return (

        <div className="container mx-auto mt-10">
            <form onSubmit={onFormSubmit} className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="option1" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Framework
                    </label>
                    <select
                        id="option1"
                        name="framework"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select One</option>
                        <option value="Next">Next</option>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="vue">Vue</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="option2" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Styles
                    </label>
                    <select
                        id="option2"
                        name="style"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select One</option>
                        <option value="css">CSS</option>
                        <option value="tailwind">Tailwind</option>
                        <option value="bootstrap">Bootstrap</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="option3" className="block text-gray-700 text-sm font-bold mb-2">
                        Select Scripting
                    </label>
                    <select
                        id="option3"
                        name="script"
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select One</option>
                        <option value="typescript">TypeScript</option>
                        <option value="javascript">JavaScript</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InitialForm;

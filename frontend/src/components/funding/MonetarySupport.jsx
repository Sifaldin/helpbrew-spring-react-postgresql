import React from "react";

export default function MonetarySupport() {
    return (
        <div className="funding-wrapper">
            <div className="funding-portal">

                <div className="gfm-embed" data-url="https://www.gofundme.com/f/help-supporting-students/widget/large/">
                </div>
                
                <div>
                    <h1>Help us make a difference</h1>
                    <p> The right to an education is a basic human right, it is vital for the development of individuals and society.
                    Here is a list of reasons grants might be awarded on:</p>
                    <div>

                        <ol className="fundingList">
                            <li>Where you live </li>
                            <li>Your financial circumstances</li>
                            <li>What your parents or sometimes other relatives do for a living</li>
                            <li>Any illnesses or disabilities you may have</li>
                            <li>Any special interests, activities or hobbies such as music, sports, drama</li>
                            <li>Whether you are the first in your family to attend university</li>
                            <li>Any circumstances which present you with particular barriers to education</li>
                            <li>If you have specific career aspirations</li>
                        </ol>

                    </div>
                    <h3>Donate today and make a difference in someone else's life</h3>
                </div>

            </div>

        </div>
    );
}
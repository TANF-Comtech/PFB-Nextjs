import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import cx from 'classnames';
import { Disclosure } from '@headlessui/react';
import { useDropzone } from 'react-dropzone';

import { useLocalStorage } from '~/hooks/useLocalStorage';

import { Button } from '~/components/simple-button';
import { Modal } from '~/components/modal';

import WhiteArrow from '~/public/white-arrow-triangle.svg';

export const Grants = () => {
  const [isRecipientsModalOpen, setIsRecipientsModalOpen] = useState<boolean>(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="bg-midnightBlue p-10 sm:p-20">
        <div className="mx-auto max-w-screen-lg text-center text-lightestGray">
          <p className="text-base leading-10 sm:text-3xl">
            The PeopleForBikes Industry Community Grant Program provides funding for projects that
            make bicycling better in communities across the U.S. Since 1999, PeopleForBikes has
            awarded more than 400 grants to nonprofit organizations and local governments in all 50
            states, the District of Columbia and Puerto Rico. Our investments total more than $3.5
            million and have leveraged $775 million in public and private funding for bike-related
            projects nationwide.
          </p>
          <Button
            label="View grant recipient list"
            onClick={() => setIsRecipientsModalOpen(true)}
            variant="blue"
            size="large"
          />
        </div>
      </div>
      <div className="p-10 sm:p-20">
        <div className="mx-auto max-w-screen-lg text-center text-darkestGray">
          <p className="text-base !leading-normal sm:text-3xl">
            PeopleForBikes simplified our grant process with just one annual cycle and no
            requirement for a Letter of Intent. To be considered, simply submit your application by
            the annual application deadline on October 31. Grant requests will be reviewed in
            November and awards will be presented in December.
          </p>
          <p className="text-base !leading-normal sm:text-3xl">
            We look forward to continuing to support work that aligns with PeopleForBikes&rsquo;
            mission — making biking better for everyone and getting more people on bikes more often.
          </p>
          <p className="text-base font-bold !leading-normal sm:text-3xl">
            Thank you, and keep up your amazing work!
          </p>
          <Button
            label="Apply now"
            onClick={() => setIsApplicationModalOpen(true)}
            variant="darkGray"
            size="small"
          />
        </div>
      </div>
      <div className="bg-midnightBlue p-10 sm:p-20">
        <div className="mx-auto max-w-screen-lg text-center text-lightestGray">
          <h2 className="font-dharma text-6xl sm:text-8xl">Grant Guidance</h2>
          <p className="text-base leading-relaxed sm:text-3xl">
            In addition to the PeopleForBikes Industry Community Grant Program, consider exploring
            the following funding sources:
          </p>
        </div>
        <div className="mx-auto max-w-screen-lg divide-y divide-lightestGray text-lightestGray">
          <GrantGuidanceSection
            label="Grocery"
            grantRecipients={[
              ['Safeway', 'http://safewayfoundation.org/'],
              ['Walmart', 'https://walmart.org/how-we-give/local-community-grants'],
              [
                'Target',
                'https://corporate.target.com/corporate-responsibility/philanthropy/corporate-giving',
              ],
            ]}
          >
            <p>
              Grocery or big box store chains often have $500 to $10,000 grants to invest in great
              community projects. Some grant funders:
            </p>
          </GrantGuidanceSection>
          <GrantGuidanceSection
            label="Banks and Credit Unions"
            grantRecipients={[
              [
                'Wells Fargo',
                'https://www.wellsfargo.com/about/corporate-responsibility/community-giving/',
              ],
              [
                'PNC Bank',
                'https://www.pnc.com/en/about-pnc/corporate-responsibility/philanthropy/pnc-foundation.html',
              ],
            ]}
          >
            <p>
              Ask your bank if they have a community grant program or otherwise support the
              non-profits that use their services. Some grant funders:
            </p>
          </GrantGuidanceSection>
          <GrantGuidanceSection
            label="Healthcare"
            grantRecipients={[
              ['Local hospital foundations', null],
              ['Anthem', 'https://www.anthemcorporateresponsibility.com/funding-options'],
              ['Kaiser Permanente', 'check your state office for info on funding opportunities'],
              [
                'American Family Insurance grants',
                'https://www.amfam.com/about/givingback/communityinvestment/community-grants',
              ],
            ]}
          >
            <p>
              If your project supports health and well-being, consider exploring funding
              opportunities that may be provided by healthcare organizations, insurers or providers.
            </p>
          </GrantGuidanceSection>
          <GrantGuidanceSection
            label="Bicycling Grant Programs"
            grantRecipients={[
              ['Quality Bicycle Products Community Grants', 'https://www.qbp.com/community-grant'],
              ['Santa Cruz PayDirt Fund', 'https://www.santacruzbicycles.com/en-US/paydirt'],
              ['Outride Fund', 'https://outridebike.org/outride-fund'],
              ['Outride Riding For Focus program', 'https://outridebike.org/ridingforfocus'],
              ['IMBA Dig In Grants', 'https://www.imba.com/digin'],
              [
                'IMBA Trail Accelerator grants',
                'https://www.imba.com/trails-for-all/trail-accelerator-grants',
              ],
            ]}
          >
            <p>
              Several bicycle companies and organizations provide grants in support of bike
              projects. Here are a few grant funders:
            </p>
          </GrantGuidanceSection>
          <GrantGuidanceSection label="Other">
            <ul className="list-disc space-y-10">
              <li>
                Free online grant writing training:{' '}
                <a
                  href="https://www.uhccommunityandstate.com/content/uhccomstate/content/articles
                /community-grants-program.html"
                  target="_blank"
                  rel="noopener"
                  className="break-words"
                >
                  https://www.uhccommunityandstate.com/content/uhccomstate/content/articles
                  /community-grants-program.html
                </a>
              </li>
              <li>
                Community foundation locator here:{' '}
                <a
                  href="https://www.cof.org/page/community-foundation-locator"
                  target="_blank"
                  rel="noopener"
                  className="break-words"
                >
                  https://www.cof.org/page/community-foundation-locator
                </a>
              </li>
              <li>
                Here’s some guidance to get you started on writing a great grant:{' '}
                <a
                  href="https://blog.charityhowto.com/grant-writing-tips-for-nonprofit"
                  target="_blank"
                  rel="noopener"
                  className="break-words"
                >
                  https://blog.charityhowto.com/grant-writing-tips-for-nonprofit
                </a>
              </li>
            </ul>
          </GrantGuidanceSection>
        </div>
      </div>
      <Modal show={isRecipientsModalOpen} onClose={() => setIsRecipientsModalOpen(false)} dark>
        <GrantRecipients />
      </Modal>
      <Modal show={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)}>
        <GrantApplication />
      </Modal>
    </>
  );
};

const GrantGuidanceSection = ({ label, grantRecipients = [], children }) => {
  return (
    <Disclosure as="div" className="py-10">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center space-x-5 text-left">
            <div
              className={cx(
                open && 'rotate-90',
                'relative inline-block transform transition duration-300',
              )}
            >
              <img src={WhiteArrow} className="h-4 w-4 sm:h-7 sm:w-7" alt="" />
            </div>
            <div className="flex-grow font-dharma text-5xl text-blue sm:text-7xl">{label}</div>
          </Disclosure.Button>
          <Disclosure.Panel>
            <div>{children}</div>
            {grantRecipients.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grantRecipients.map(([title, urlOrLabel]) => {
                  if (!urlOrLabel)
                    return (
                      <div
                        key={title}
                        className="inline-flex flex-col items-center justify-center bg-lightestGray p-10 text-center text-lg text-darkestGray sm:text-2xl"
                      >
                        <div>{title}</div>
                      </div>
                    );

                  return urlOrLabel.startsWith('http') ? (
                    <a
                      key={title}
                      href={urlOrLabel}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center justify-center bg-lightestGray p-10 text-center text-lg sm:text-2xl"
                    >
                      {title}
                    </a>
                  ) : (
                    <div
                      key={title}
                      className="inline-flex flex-col items-center justify-center bg-lightestGray p-10 text-center text-lg text-darkestGray sm:text-2xl"
                    >
                      <div>{title}</div>
                      <div className="mt-1 text-sm">{urlOrLabel}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const GrantRecipients = () => {
  return (
    <>
      <h3 className="-mx-10 -mt-10 bg-midnightBlue p-10 font-dharma text-4xl font-normal text-white sm:text-7xl lg:-mx-20 lg:-mt-20 lg:p-20">
        PeopleForBikes Industry Community Grants, Special Grants and Sponsorships
      </h3>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {grantRecipients.map((recipient) => (
          <div
            key={recipient}
            className="inline-flex items-center justify-center bg-lightestGray p-10 text-center text-xl"
          >
            {recipient}
          </div>
        ))}
      </div>
    </>
  );
};

const GrantApplication = () => {
  const [step, setStep] = useState<number>(1);

  // @TODO remove these 3 states if unused
  const [hasSent, setHasSent] = useState<boolean>(false);
  const [hasReceived, setHasReceived] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [name, setName] = useLocalStorage('name', '');
  const [title, setTitle] = useLocalStorage('title', '');
  const [email, setEmail] = useLocalStorage('email', '');
  const [phone, setPhone] = useLocalStorage('phone', '');
  const [organization, setOrganization] = useLocalStorage('organization', '');
  const [address, setAddress] = useLocalStorage('address', '');
  const [missionAndHistory, setMissionAndHistory] = useLocalStorage('missionAndHistory', '');
  const [projectDescription, setProjectDescription] = useLocalStorage('projectDescription', '');
  const [communityBenefits, setCommunityBenefits] = useLocalStorage('communityBenefits', '');
  const [diversityStatement, setDiversityStatement] = useLocalStorage('diversityStatement', '');
  const [evaluation, setEvaluation] = useLocalStorage('evaluation', '');

  const [attachments, setAttachments] = useState<Array<any>>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedAttachments) => {
      setAttachments([...attachments, ...acceptedAttachments]);
    },
  });

  const ref = useRef(null);

  const handleReset = useCallback(() => {
    setName('');
    setTitle('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setAddress('');
    setMissionAndHistory('');
    setProjectDescription('');
    setCommunityBenefits('');
    setDiversityStatement('');
    setEvaluation('');
    setAttachments([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReview = () => {
    setStep(2);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleEdit = () => {
    setStep(1);
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('title', title);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('organization', organization);
      formData.append('address', address);
      formData.append('missionAndHistory', missionAndHistory);
      formData.append('projectDescription', projectDescription);
      formData.append('communityBenefits', communityBenefits);
      formData.append('diversityStatement', diversityStatement);
      formData.append('evaluation', evaluation);

      attachments.forEach((attachment, index) => {
        formData.append(`attachment${index + 1}`, attachment, attachment.name);
      });

      setHasSent(true);

      const response = await fetch('/api/application', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'Application sent') {
        setHasReceived(true);
        handleReset();
        setStep(3);
        if (ref.current) {
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }

      if (result.status === 'Invalid application') {
        setError(`Invalid application`);
        setStep(0);
      }
    },
    [
      name,
      title,
      email,
      phone,
      organization,
      address,
      missionAndHistory,
      projectDescription,
      communityBenefits,
      diversityStatement,
      evaluation,
      attachments,
      handleReset,
    ],
  );

  const isFormValid = name?.length > 3 && email?.length > 5;

  return (
    <>
      <h3 ref={ref} className="font-dharma text-5xl font-normal sm:text-8xl">
        PeopleForBikes Grant Application
      </h3>
      {step === 0 && (
        <div className="mx-auto mt-10 max-w-screen-lg space-y-10 text-xl sm:mt-20 sm:space-y-20 sm:text-3xl">
          <div>
            Invalid submission: please make sure you have filled out every field and required
            attachments and try again.
          </div>
          <Button onClick={handleEdit} variant="lightGray" label="Edit" />
        </div>
      )}
      {step === 1 && (
        <div className="mx-auto mt-10 max-w-screen-lg space-y-10 text-lg sm:mt-20 sm:space-y-20 sm:text-xl">
          <div>
            <div className="font-bold">NAME OF PERSON SUBMITTING THE REQUEST</div>
            <input
              value={name}
              onChange={(evt) => setName(evt.currentTarget.value)}
              className="form-input mt-1 w-full"
              required
            />
          </div>
          <div>
            <div className="font-bold">TITLE OF PERSON SUBMITTING THE REQUEST</div>
            <input
              value={title}
              onChange={(evt) => setTitle(evt.currentTarget.value)}
              className="form-input mt-1 w-full"
            />
          </div>
          <div>
            <div className="font-bold">NAME OF ORGANIZATION</div>
            <input
              value={organization}
              onChange={(evt) => setOrganization(evt.currentTarget.value)}
              className="form-input mt-1 w-full"
            />
          </div>
          <div>
            <div className="font-bold">ADDRESS OF ORGANIZATION</div>
            <textarea
              value={address}
              onChange={(evt) => setAddress(evt.currentTarget.value)}
              className="form-textarea mt-5 w-full"
              rows={4}
            />
          </div>
          <div>
            <div className="font-bold">EMAIL</div>
            <input
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
              className="form-input mt-1 w-full"
              required
            />
          </div>
          <div>
            <div className="font-bold">PHONE</div>
            <input
              value={phone}
              onChange={(evt) => setPhone(evt.currentTarget.value)}
              className="form-input mt-1 w-full"
            />
          </div>
          <div>
            <div className="font-bold">MISSION AND HISTORY</div>
            <div>Summarize your organization&apos;s mission and history</div>
            <textarea
              value={missionAndHistory}
              onChange={(evt) => setMissionAndHistory(evt.currentTarget.value)}
              className="form-textarea mt-5 w-full"
              rows={8}
            />
          </div>
          <div>
            <div className="font-bold">PROJECT DESCRIPTION</div>
            <div>Please summarize your project</div>
            <textarea
              value={projectDescription}
              onChange={(evt) => setProjectDescription(evt.currentTarget.value)}
              className="form-textarea mt-5 w-full"
              rows={8}
            />
          </div>
          <div>
            <div className="font-bold">COMMUNITY BENEFITS AND PEOPLE SERVED</div>
            <div>
              1) Describe the benefits you expect this project to bring to the community, such as
              increased ridership, improved safety or health, or economic improvements. 2) Describe
              who will be served by this project, including information such as age, ability,
              socioeconomic and/or racial demographics.
            </div>
            <textarea
              value={communityBenefits}
              onChange={(evt) => setCommunityBenefits(evt.currentTarget.value)}
              className="form-textarea mt-5 w-full"
              rows={8}
            />
          </div>
          <div>
            <div className="font-bold">DIVERSITY, EQUITY, AND INCLUSION</div>
            <div>Please describe how your project addresses diversity, equity, and inclusion.</div>
            <textarea
              value={diversityStatement}
              onChange={(evt) => setDiversityStatement(evt.currentTarget.value)}
              className="form-textarea mt-5 w-full"
              rows={8}
            />
          </div>
          <div>
            <div className="font-bold">EVALUATION</div>
            <div>
              Measureable Outcomes: Describe what will change as a result of this project.
              Measurement: Describe your plans for measuring the success of your project. What will
              you measure (i.e. ridership, economic impact) and how?
            </div>
            <textarea
              value={evaluation}
              onChange={(evt) => setEvaluation(evt.currentTarget.value)}
              className="form-textarea mt-5 w-full"
              rows={8}
            />
          </div>
          <div>
            <div className="font-bold">REQUIRED ATTACHMENTS</div>
            <div className="mt-5">
              <div className="inline font-bold">List of Board Members and Affiliations</div>{' '}
              (nonprofit organizations only)
            </div>
            <div className="mt-5">
              <div className="inline font-bold">IRS Determination Letter</div> (nonprofit
              organizations only)
            </div>
            <div className="mt-5">
              <div className="inline font-bold">Project Budget</div>
              <br />
              including pending or commited sources of funding and indicating how PeopleForBikes
              funding will be used
            </div>
            <div className="mt-5">
              <div className="inline font-bold">Organizational Budget</div>
              <br />
              for the current year; you may alternatively provide a link to your annual budget
            </div>
            <div className="mt-10">
              <div className="rounded-md bg-lightestGray p-5" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag and drop some files here, or click to select files</p>
                )}
              </div>
              <div className="mt-5 flex flex-col space-y-5">
                {attachments.map((attachment) => (
                  <div key={attachment.name}>
                    <span className="rounded bg-gray p-2 text-white">{attachment.name}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAttachments([])}
                className="mt-5 rounded bg-red px-2 py-1 text-white"
              >
                Delete attachments
              </button>
            </div>
          </div>
          <div className="flex space-x-10">
            <Button onClick={handleReview} label="Review" />
            <Button onClick={handleReset} variant="lightGray" label="Reset" />
          </div>
        </div>
      )}
      {step === 2 && (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-screen-lg space-y-10 text-lg sm:mt-20 sm:space-y-20 sm:text-xl"
        >
          <div>
            <div className="font-bold">NAME OF PERSON SUBMITTING THE REQUEST</div>
            {name?.length > 3 ? <div>{name}</div> : <Error>Missing field!</Error>}
          </div>
          <div>
            <div className="font-bold">TITLE OF PERSON SUBMITTING THE REQUEST</div>
            <div>{title}</div>
          </div>
          <div>
            <div className="font-bold">NAME OF ORGANIZATION</div>
            <div>{organization}</div>
          </div>
          <div>
            <div className="font-bold">ADDRESS OF ORGANIZATION</div>
            <div>{address}</div>
          </div>
          <div>
            <div className="font-bold">EMAIL</div>
            {email?.length > 5 ? <div>{email}</div> : <Error>Missing field!</Error>}
          </div>
          <div>
            <div className="font-bold">PHONE</div>
            <div>{phone}</div>
          </div>
          <div>
            <div className="font-bold">MISSION AND HISTORY</div>
            <Paragraphs>{missionAndHistory}</Paragraphs>
          </div>
          <div>
            <div className="font-bold">PROJECT DESCRIPTION</div>
            <Paragraphs>{projectDescription}</Paragraphs>
          </div>
          <div>
            <div className="font-bold">COMMUNITY BENEFITS AND PEOPLE SERVED</div>
            <Paragraphs>{communityBenefits}</Paragraphs>
          </div>
          <div>
            <div className="font-bold">DIVERSITY, EQUITY, AND INCLUSION</div>
            <Paragraphs>{diversityStatement}</Paragraphs>
          </div>
          <div>
            <div className="font-bold">EVALUATION</div>
            <Paragraphs>{evaluation}</Paragraphs>
          </div>
          <div>
            <div className="mt-10">
              <div className="font-bold">ATTACHMENTS</div>
              {attachments?.length > 0 ? (
                <div className="flex flex-col space-y-5">
                  {attachments.map((attachment) => (
                    <div key={attachment.name} className="mt-5">
                      <span className="rounded bg-gray p-2 text-white">{attachment.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <Error>No attachments found!</Error>
              )}
            </div>
          </div>
          <div className="flex space-x-10">
            {isFormValid && <Button type="submit" label="Submit" />}
            <Button onClick={handleEdit} variant="lightGray" label="Edit" />
          </div>
        </form>
      )}
      {step === 3 && (
        <div className="mx-auto mt-10 max-w-screen-lg space-y-10 text-xl sm:mt-20 sm:space-y-20 sm:text-3xl">
          <div>Thank you for your application!</div>
        </div>
      )}
    </>
  );
};

const Paragraphs = ({ children }) => {
  return typeof children === 'string'
    ? children.split('\n').map((line: string) => <p key={line}>{line}</p>)
    : children;
};

const Error = ({ children }) => {
  return <div className="font-bold text-red">{children}</div>;
};

const grantRecipients = [
  'Active Transportation Alliance',
  'Association of Pedestrian and Bicycle Professionals',
  'Balance Bike Course at Trails End Park',
  'Baltimore Play Streets Advocacy Program',
  'Ben’s Bike Playground',
  'Better Bike Share Grants',
  'Beverly Multi-Use Trail',
  'Bicycle Coalition of Greater Philadelphia',
  'Bicycle Colorado',
  'Bicycle Leadership Conference',
  'Big Jump City Grants',
  'Bike Durham Low Stress Network',
  'Bike New York',
  'Bike to the Future',
  'Bikes Not Bombs Bike Park/Pump Track',
  'Black Girls Do Bike',
  'Boulder B-Cycle',
  'Boulder Mountain Bike Alliance',
  'Bridge the Ashley',
  'Cacapon State Park Beginner Trail',
  'Camber Outdoors',
  'Canada Bikes',
  'Community Cycles',
  'Connecting Trails to Downtown',
  'Covered Bike Parking at Newton High Schools',
  'Cresta Pump Track',
  'DEI Grants',
  'Depot District',
  'Desert Downs Bike Park',
  'Ecology Action',
  'Equiticity',
  'Families Come Together to Play',
  'Farmington Pump Track',
  'Filmed By Bike',
  'Final Mile Grants',
  'Fountain Park Youth Bike Park',
  'Ghisallo Cycling Initiative',
  'Green Lane Program City Grants',
  'Grand Traverse Traffic Garden + Pump Track',
  'Grow Cycling Foundation',
  'Horseshoe Canyon Non-Motorized Trail System: Bovine Re-route',
  'International Mountain Biking Association',
  'Jackson Street Bridge Placemaking',
  'John Day Bike Park',
  'Johnson Bike Terrain',
  'Kavanaugh Bike Lane',
  'La Harpe City Park Pump Track',
  'Laramie Middle School Bike Path',
  'League of American Bicyclists',
  'Minturn Bike Park',
  'MKE Modular Parklet',
  'Mott Park Bicycle Garden',
  'National Association of City Transportation Officials',
  'National Bicycle Dealers Association',
  'National Bicycle Tourism Conference',
  'National Interscholastic Cycling Association',
  'NC Complete Streets Campaign',
  'Oak Creek School Mountain Bike Skills Park',
  'OSPREY’s Bike Rack and Bike Repair Stations',
  'Outdoor Industry Association',
  'Ozark Outdoor Foundation',
  'People For Parks',
  'Project Bike Tech',
  'Pump Track at the Big Blue Bike Barn',
  'Pump Track at Pinto Lake County Park',
  'RAGBRAI',
  'Rebecca’s Private Idaho',
  'Recycled Tires as Bike Lane Barriers – Broad Ave Demonstration Project',
  'Rich City Rides Hub Improvement Project',
  'RVT Mile 19 Gap',
  'Safe Routes to School National Partnership',
  'Sherando Bike Park',
  'Shonto Pump Track',
  'Sierra Buttes Trail Stewardship',
  'Silver Dollar BMX Relocation + Track Rebuild',
  'Society of Outdoor Recreation Professionals',
  'St. Louis Protected Bike Lanes',
  'Steamboat Gravel Race',
  'Stumphouse Mountain Bike Park Trail Construction',
  'The Untokening',
  'Transportation Alternatives',
  'TVTAP Winter Trails Program',
  'Ungap the Map',
  'USA Cycling',
  'Walk/Bike/Places National Conference',
  'Warrior Trail Phase 3',
  'We Bike Juntos',
  'Wilmington Fix-It Stations',
  'Winged Deer Mountain Bike Trails',
  'Wirth Park Pump Track and Skills Park',
  'World Bicycle Industry Association',
  'World Cycling Alliance',
  'Youth Bike Summit',
  'Youth Grants',
];

import React from "react";
import type { Basics } from "../../store/cv";

interface BasicsSectionProps {
  basics?: Basics;
}

export const BasicsSection: React.FC<BasicsSectionProps> = ({ basics }) => {
  if (!basics) return null;

  return (
    <header className="mb-8 print:mb-4 border-b border-gray-200 print:border-gray-400 pb-6 print:pb-3 print:break-inside-avoid">
      {/* Name and title section with image */}
      <div className="flex items-start gap-6 print:gap-3 mb-4 print:mb-2">
        {/* Profile Image */}
        {basics.image && (
          <div className="flex-shrink-0">
            <img
              src={basics.image}
              alt={`${basics.name} profile`}
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-3 border-gray-200 shadow-md"
            />
          </div>
        )}

        {/* Name and title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl print:text-2xl font-bold text-gray-900 mb-2 print:mb-1 leading-tight print:leading-tight">
            {basics.name}
          </h1>

          {basics.jobPosition && (
            <h2 className="text-xl print:text-base text-blue-600 print:text-gray-700 font-medium mb-3 print:mb-1">
              {basics.jobPosition}
            </h2>
          )}
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <div className="mb-6 print:mb-3">
          <p className="text-gray-700 print:text-gray-800 text-base print:text-xs leading-relaxed print:leading-normal print:text-justify">
            {basics.summary}
          </p>
        </div>
      )}

      {/* Contact Information */}
      <div className="flex gap-6 flex-wrap text-sm print:text-xs print:grid print:grid-cols-1 print:gap-2">
        {basics.email && (
          <div className="flex items-center gap-2 print:gap-1">
            <span className="font-medium text-gray-600 print:text-gray-700">
              Email:
            </span>
            <a
              href={`mailto:${basics.email}`}
              className="text-blue-600 hover:text-blue-800 print:text-gray-900 break-all"
            >
              {basics.email}
            </a>
          </div>
        )}

        {basics.phone && (
          <div className="flex items-center gap-2 print:gap-1">
            <span className="font-medium text-gray-600 print:text-gray-700">
              Teléfono:
            </span>
            <a
              href={`tel:${basics.phone}`}
              className="text-blue-600 hover:text-blue-800 print:text-gray-900"
            >
              {basics.phone}
            </a>
          </div>
        )}

        {basics.url && (
          <div className="flex items-center gap-2 print:gap-1">
            <span className="font-medium text-gray-600 print:text-gray-700">
              Web:
            </span>
            <a
              href={basics.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 print:text-gray-900 break-all"
            >
              {basics.url.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {basics.location && (
          <div className="flex items-center gap-2 print:gap-1">
            <span className="font-medium text-gray-600 print:text-gray-700">
              Ubicación:
            </span>
            <div className="text-gray-700 print:text-gray-800">
              {basics.location.city && basics.location.region && (
                <span>
                  {basics.location.city}, {basics.location.region}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Social Profiles */}
      {basics.profiles && basics.profiles.length > 0 && (
        <div className="mt-4 print:mt-2">
          <h3 className="font-medium text-gray-600 print:text-gray-700 mb-2 print:my-2 text-sm print:text-xs">
            Perfiles:
          </h3>
          <div className="flex justify-start gap-2  print:grid print:grid-cols-1 print:gap-2">
            {basics.profiles.map((profile, index) => (
              <div
                key={index}
                className="flex items-center gap-2 print:gap-1 text-sm print:text-xs"
              >
                <span className="font-medium text-gray-600 print:text-gray-700 capitalize">
                  {profile.network}:
                </span>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 print:text-gray-900 break-all"
                >
                  {profile.username}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default BasicsSection;

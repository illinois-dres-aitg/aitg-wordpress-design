<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:svg="http://www.w3.org/2000/svg">

  <xsl:param name="addAriaHidden" select="true()"/>

  <xsl:output method="text" encoding="UTF-8" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    const xmlns = 'http://www.w3.org/2000/svg';
    <xsl:apply-templates/>
    <xsl:text>
    return svg;&#xa;&#xa;</xsl:text>
  </xsl:template>

  <xsl:template match="svg:svg">
    <xsl:call-template name="default">
      <xsl:with-param name="name" select="'svg'"/>
    </xsl:call-template>
    <xsl:if test="$addAriaHidden">
      <xsl:value-of select="name()"/>.setAttributeNS(null, 'aria-hidden', 'true');
    </xsl:if>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="svg:title|svg:desc">
    let <xsl:value-of select="name()"/> = document.createElementNS(xmlns, '<xsl:value-of select="name()"/>');
    let text = document.createTextNode('<xsl:value-of select="."/>');
    <xsl:value-of select="name()"/>.appendChild(text);
    <xsl:call-template name="appendChild"/>
  </xsl:template>

  <xsl:template match="svg:*">
    <xsl:call-template name="default">
      <xsl:with-param name="name" select="concat(name(), count(preceding::*[local-name()=name()]))"/>
    </xsl:call-template>
    <xsl:call-template name="appendChild"/>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template name="default">
    <xsl:param name="name"/>
    let <xsl:value-of select="$name"/> = document.createElementNS(xmlns, '<xsl:value-of select="name()"/>');
    <xsl:for-each select="@*">
      <xsl:value-of select="$name"/>.setAttributeNS(null, '<xsl:value-of select="name()"/>', '<xsl:value-of select="."/>');
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="appendChild">
    <xsl:variable name="parentName">
      <xsl:choose>
        <xsl:when test="count(ancestor::*[1]/preceding::*)=0">
          <xsl:value-of select="name(..)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat(name(..), count(ancestor::*[1]/preceding::*))"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="childName">
      <xsl:choose>
        <xsl:when test="count(preceding::*[local-name()=name()])=0">
          <xsl:value-of select="name()"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat(name(), count(preceding::*[local-name()=name()]))"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:value-of select="$parentName"/>.appendChild(<xsl:value-of select="$childName"/>);
  </xsl:template>

</xsl:transform>
